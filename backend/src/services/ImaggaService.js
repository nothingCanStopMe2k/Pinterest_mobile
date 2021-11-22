const got = require('got');

const apiKey = 'acc_4f6c4f03be33f19';
const apiSecret = '8a184f39c3d98af0951c2fd1b86a7e40';

const createTag = async (link) => {
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(link);
    try {
        const response = await got(url, {username: apiKey, password: apiSecret});
        let tag =  (JSON.parse(response.body).result.tags.slice(0,4).map((data)=> data.tag.en));
        return tag;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export default createTag;