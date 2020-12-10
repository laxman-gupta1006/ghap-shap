export function getNameInitials(name){
   const splitname=name.toUpperCase().split(' ');
   if(splitname.length>1){
      return splitname[0][0]+splitname[1][0];
   }
   return splitname[0][0];
}
/*eslint-disable*/
export function transformtoarrwithid(snapval){
   return snapval ? Object.keys(snapval).map(roomId=>{
      return {...snapval[roomId],id:roomId}
   }):[]
}