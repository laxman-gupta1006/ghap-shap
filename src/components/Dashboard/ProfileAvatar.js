import React from 'react'
import { Avatar } from 'rsuite'
import { getNameInitials } from '../../misc/Helper'

export const ProfileAvatar = ({name,...AvatarProps}) => 
<Avatar circle {...AvatarProps} >
   {getNameInitials(name)}
</Avatar>
