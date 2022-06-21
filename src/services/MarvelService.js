
import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} =useHttp();

    const _apiBase ='https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d312fa1d34cbd0abf873303d06868ae4';
    const _baseOffset =210;


    const getAllCharacters = async (offset =_baseOffset ) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    // for comics
    const getAllComics = async (offset = 0 ) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }


    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id:char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics:char.comics.item
        }
    }

    const  _transformComic = (comics) => {
        return {
        id: comics.id,
        title: comics.title,
        description: comics.description || 'Here is no description',
        language: comics.textObjects.language || 'en-us',
        thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        price:comics.prices.price + `$`,

        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComic, getAllComics}
}

export default useMarvelService;