import { request } from '@/plugins/request';

export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    });
}

export const createArticle = data => {
    return request({
        method: 'POST',
        url: '/api/articles',
        data
    });
}

export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    });
}

export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    });
}

export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    });
}

export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    });
}

export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    });
}

export const addComment = (slug, comment) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data: {
            comment: {
                body: comment
            }
        }
    });
}

export const deleteComment = (slug, commentId) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${commentId}`,
    });
}