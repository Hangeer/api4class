let api_test_post = async (ctx, next) => {
    let body = ctx.request.body;
    let defaultName = 'DEFAULT NAME';

    let result = {
        dialog: `Your name is: ${body.name || defaultName}`
    };

    Object.assign(ctx.response, {
        type: 'application/json',
        body: JSON.stringify(result)
    });
}
/** 
 *  params: {
 *      name: XXX
 *  }
 * 
 *  response: {
 *      dialog: `Your name is: XXX`
 *  }
*/

let api_text_get = async (ctx, next) => {
    let page = ctx.params.page; 

    let result = {
        page: page,
        content: [
            `First data of page ${page}`,
            `Second data of page ${page}`,
            `Third data of page ${page}`
        ]
    };

    Object.assign(ctx.response, {
        type: 'application/json',
        body: JSON.stringify(result)
    });
}

module.exports = {
    'POST /test/post': api_test_post,
    'GET /test/get/:page': api_text_get
}