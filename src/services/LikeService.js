// import axios from 'axios'
// import { API_URL } from '../settings'
import ServerExchangeClass from "@/services/ServerExchangeClass"

class LikeServiceClass extends ServerExchangeClass {}

const LikeService = new LikeServiceClass('likes')

export default LikeService