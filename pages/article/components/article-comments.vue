<template>
  <div>
      <form class="card comment-form" v-if="user">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="newComment"></textarea>
          </div>
          <div class="card-footer">
            <img :src="user.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" @click.prevent="postComment()">
             Post Comment
            </button>
          </div>
        </form>
        
        <div class="card" v-for="comment in comments" :key="comment.id">
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <nuxt-link :to="{
                name: 'profile',
                params: {
                    username: comment.author.username
                }
            }" class="comment-author">
              <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link :to="{
                name: 'profile',
                params: {
                    username: comment.author.username
                }
            }" class="comment-author">{{comment.author.username}}</nuxt-link>
            <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
            <span class="mod-options">
                <i class="ion-trash-a" @click.prevent="removeComment(comment)"></i>
            </span>
          </div>
        </div>
  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article';
import { mapState } from 'vuex';

export default {
    name: 'ArticleComments',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            comments: [],
            newComment: ''
        }
    },
    async mounted() {
        const { data } = await getComments(this.article.slug);
        this.comments = data.comments;
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async postComment() {
            await addComment(this.article.slug, this.newComment);
            this.newComment = '';
            
            const { data } = await getComments(this.article.slug);
            this.comments = data.comments;
        },

        async removeComment(comment) {
            await deleteComment(this.article.slug, comment.id);
            
            const { data } = await getComments(this.article.slug);
            this.comments = data.comments;
        }
    }
}
</script>

<style>

</style>