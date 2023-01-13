import { batch, Component, createEffect, createResource, createSignal, For } from 'solid-js'
import { fetchData } from '../api/test'
import { Client } from '@hapi/nes/lib/client'

const baseUrl = '192.168.1.12:3001'

const Api: Component = () => {
    const [data] = createResource(fetchData)
    const [message, setMessage] = createSignal('')
    const [words, setWords] = createSignal('')
    const [animate, setAnimate] = createSignal(false)
    let animateId = null

    var client = new Client(`ws://${baseUrl}`)

    createEffect(() => {
        // console.log('words', words())
    })

    const handleWords = (update, flags) => {
        if (animateId !== null) {
            clearTimeout(animateId)
            animateId = null
            setWords(update.word)
        } else {
            batch(() => {
                setAnimate(true)
                setWords(update.word)
            })
        }
        animateId = setTimeout(() => {
            animateId = null
            setAnimate(false)
        }, 3000)
    }

    const getAnimate = () => {
        if (animate() === true) {
            return 'animate-fadeIn'
        }
        return 'animate-fadeOut'
    }

    createEffect(async () => {
        await client.connect()
        client.subscribe('/item/5', handleWords)
        const payload = await client.request('hello')
        setMessage(payload.payload)
    })

    return (
        <div>
            <p class="text-4xl text-white text-center py-10">Data from Api</p>
            {/* <p class="text-4xl text-white text-center py-10">{data()?.message}</p> */}
            {/* <p class="text-4xl text-white text-center py-10">Hello {message()}</p> */}
            <div class="py-10">
                <div class={`text-8xl text-white text-center ${getAnimate()}`}>{words()}</div>
            </div>
        </div>
    )
}

export default Api
