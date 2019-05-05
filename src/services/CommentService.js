import axios from 'axios'
import { API_URL } from '../settings'
import ServerExchangeClass from "@/services/ServerExchangeClass"

class MarkServiceClass extends ServerExchangeClass { }

class CommentServiceClass extends ServerExchangeClass {

  getAllOfMovie(movieID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/${this.dataName}/?movieId=${movieID}&_expand=user&_embed=likes&_embed=dislikes`)
        .then(response => {
          const comments = response.data
          resolve(comments)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  addMark(comment, userID, markType, oppositeMark) {

    /*
     markType = 'likes' / 'dislikes'
     define which data are handled
    */

    const MarkService = new MarkServiceClass(markType)

    return new Promise((resolve, reject) => {

      const markInfo = {
        userId: userID,
        commentId: comment.id
      }

      MarkService.createOne(markInfo)
        .then(() => {
          // delete opposite mark if it exists
          if (oppositeMark !== undefined) {
            const oppositeMarkType = (markType == 'likes') ? 'dislikes' : 'likes'
            const OppositeMarkService = new MarkServiceClass(oppositeMarkType)
            return OppositeMarkService.deleteOne(oppositeMark.id)
          }
        })
        .then(() => {
          return this.getUpdatedCommentInfo(comment)
        })
        .then(commentUpdated => {
          resolve(commentUpdated)
        })
        .catch(err => {
          reject(err)
        })

    })
  }

  removeMark(comment, markID, markType) {

    /*
     markType = 'likes' / 'dislikes'
     define which data are handled
    */

    const MarkService = new MarkServiceClass(markType)

    return new Promise((resolve, reject) => {

      MarkService.deleteOne(markID)
        .then(() => {
          return this.getUpdatedCommentInfo(comment)
        })
        .then(commentUpdated => {
          resolve(commentUpdated)
        })
        .catch(err => {
          reject(err)
        })

    })
  }

  getUpdatedCommentInfo(comment) {
    return this.getOneExtend(comment.id, {
      embed: ['likes', 'dislikes'],
      expand: 'user'
    })
  }


}

const CommentService = new CommentServiceClass('comments')

export default CommentService