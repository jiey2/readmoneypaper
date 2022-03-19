import moneyBag from './1F4B0.svg'
import cash from './1F4B5.svg'
import key from './1F5DD.svg'
import whale from './E004.svg'
import map from './E04A.svg'
import chart from './E049.svg'

const emojiArray = [moneyBag, cash, key, whale, map, chart];
export default emojiArray[Math.floor(Math.random()*emojiArray.length)];