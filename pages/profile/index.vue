<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="user.image" class="user-img" />
          <h4>{{user.username}}</h4>
          <p>
            {{user.bio}}
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn" :class="{active: user.following}" @click="onFollow()">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{user.username}}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" :class="{active: tab === 'my_articles'}" exact :to="{
                name: 'profile',
                query: {
                  tab: 'my_articles'
                },
                params: {
                  username: user.username
                }
              }">My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :class="{active: tab === 'favorited_articles'}" exact :to="{
                name: 'profile',
                query: {
                  tab: 'favorited_articles'
                },
                params: {
                  username: user.username
                }
              }">Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
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
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
                active: article.favorited
              }" :disabled="article.favoriteDisabled" @click="onFavorite(article)">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getProfile } from '@/api/profile';
import { getArticles } from '@/api/article';
import { followUser, unfollowUser } from '@/api/profile';

export default {
    name: "UserProfile",
    middleware: 'authenticated',
    async asyncData({ params, query }) {
      const tab = query.tab || 'my_articles';
      const [profileRes, articleRes] = await Promise.all([
        getProfile(params.username),

        tab === 'my_articles' ? getArticles({author: params.username})
         : getArticles({favorited: params.username})
      ]);

      return {
        user: profileRes.data.profile,
        articles: articleRes.data.articles,
        tab
      }
    },
    watchQuery: ['tab'],
    methods: {
      async onFollow() {
          if (!this.user) {
              return;
          }

          if (this.user.following) {
              await unfollowUser(this.user.username);
              this.user.following = false;
              return;
          }

          await followUser(this.user.username);
          this.user.following = true;
      }
    }
}
</script>

<style>

</style>