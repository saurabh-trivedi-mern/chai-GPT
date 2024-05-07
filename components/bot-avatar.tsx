
import { Avatar, AvatarImage} from './ui/avatar';

const BotAvatar = () => {

    return ( 
        <Avatar className="h-10 w-10">
            <AvatarImage className='p-1' src='/logo-chai.png'/>
        </Avatar>

     );
}
 
export default BotAvatar;