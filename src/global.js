let url

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8000/api'
} else {    
    url = 'https://kasir-kita.herokuapp.com/api'
}

export { url }