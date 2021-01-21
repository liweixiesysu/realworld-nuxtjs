<template>
  <div class="article-meta">
    <nuxt-link :to="{
        name: 'profile',
        params: {
            username: article.author.username
        }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: article.author.username
            }
        }" class="author">{{article.author.username}}</nuxt-link>
        <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}" @click="onFollow()">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{article.author.username}}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}" @click="onFavorite()" :disabled="favoriteDisabled">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import { followUser, unfollowUser } from '@/api/profile';
import { addFavorite, deleteFavorite } from '@/api/article';
import { mapState } from 'vuex';

export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data: {
        favoriteDisabled: false
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async onFavorite() {
            if (!this.user) {
                return;
            }

            this.favoriteDisabled = true;
            if (this.article.favorited) {
                await deleteFavorite(this.article.slug);
                this.article.favorited = false;
                --this.article.favoritesCount;
            } else {
                await addFavorite(this.article.slug);
                this.article.favorited = true;
                ++this.article.favoritesCount;
            }

            this.favoriteDisabled = false;
        },
        async onFollow() {
            if (!this.user) {
                return;
            }

            if (this.article.author.following) {
                await unfollowUser(this.article.author.username);
                this.article.author.following = false;
                return;
            }

            await followUser(this.article.author.username);
            this.article.author.following = true;
        }
    }
}
</script>

<style>

</style>