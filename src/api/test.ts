const baseUrl = 'http://192.168.1.12:3001'

const fetchData = async () => {
    console.log('calling /api/test')
    const data = await fetch(`${baseUrl}/api/test`)
    console.log(data)
    return data.json()
}

export { fetchData }
