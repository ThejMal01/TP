import {IoBarChartSharp} from 'react-icons/io5'
import {MdQueryStats} from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'

const links = [
    { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp/>},
    { id: 2, text: 'all delivery', path: 'all-delivery', icon: <MdQueryStats/>},
    { id: 3, text: 'add delivery', path: 'add-delivery', icon: <FaWpforms/>},
    { id: 4, text: 'profile', path: 'profile', icon: <ImProfile/>},
]

export default links