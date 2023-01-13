const baseUrl = 'http://192.168.1.12:3001'

const fetchData = async () => {
    console.log('calling /test')
    const data = await fetch(`${baseUrl}/test`)
    console.log(data)
    return data.json()
}

export { fetchData }
