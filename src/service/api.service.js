import axios  from "axios"


const BASE_URI = 'https://youtube-v31.p.rapidapi.com'


const options = {
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': '2f0fa389d9mshc92178802c764c5p1aabe2jsn128907b85623',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};
  
export const ApiService = {
    async fetching(url) {
      const response = await axios.get(`${BASE_URI}/${url}`, options)
      return response.data
    },
}