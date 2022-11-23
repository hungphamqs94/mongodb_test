import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema


const PostSchema = new Schema({
  itemId: Number,
  address: String,
  tokenId: Number,
  seller: String,
  owner: String,
  category: String,
  price: Number,
  isSold: Boolean
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

PostSchema.plugin(mongoosePaginate)

export default mongoose.model('posts', PostSchema)
