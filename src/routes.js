import { Router } from 'express'
import Post from './models/post.js'

const router = Router()

const handlePageError = (res, e) => res.setStatus(500).send(e.message)

// Define CURD routes here..
// Ex: router.get(..)
// Create document:
router.post(
    '/posts',
    async (req, res) => {
      try {
        console.log('gio dong qua:', req.body)
        const post = await new Post(req.body).save()
  
        return res.send({
          message: 'Created new post successfully!',
          data: post
        })
      } catch (e) {
        // return handlePageError(res, e)
        console.log(e)
      }
    }
)

// Update an existing document:
router.put(
    '/posts/:id',
    async (req, res) => {
      try {
        await Post.findByIdAndUpdate(req.params.id, req.body)
  
        return res.json({ message: 'Updated post successfully!' })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
)

router.get('/posts', async (req, res) => {
    try {
      const options = {
        sort: { _id: -1 },
        limit: parseInt(req.query.limit || 20, 10),
        page: parseInt(req.query.page || 1, 10)
      }
  
      const posts = await Post.paginate({}, options)
  
      return res.send(posts)
    } catch (e) {
      return handlePageError(res, e)
    }
})

router.get(
    '/post/:category',
    async (req, res) => {
      try {
        const post = await Post.find({category: req.params.category})
  
        return res.send(post)
        
      } catch (e) {
        return handlePageError(res, e)
      }
    }
)
  

export default router
