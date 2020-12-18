export function getNameInitials(name) {
  const splitname = name.toUpperCase().split(' ');
  if (splitname.length > 1) {
    return splitname[0][0] + splitname[1][0];
  }
  return splitname[0][0];
}
/*eslint-disable*/
export function transformtoarrwithid(snapval) {
  return snapval
    ? Object.keys(snapval).map(roomId => {
        return { ...snapval[roomId], id: roomId };
      })
    : [];
}

export async function getUserUpdate(userId, keyToUpdate, value, db) {
  const updates = {};
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');
  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');
  const [msnap, rsnap] = await Promise.all([getMsgs, getRooms]);
  msnap.forEach(msgsnap => {
    updates[`/messages/${msgsnap.key}/author/${keyToUpdate}`] = value;
  });
  rsnap.forEach(roomsnap => {
    updates[`/rooms/${roomsnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });
  return updates;
}


export function transformtoarr(snapval){
   return snapval ? Object.keys(snapval):[]
}