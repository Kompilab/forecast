import Cookie from 'universal-cookie';

const cookie = new Cookie();
const currentUser = cookie.get('_fo_active_user_');

export default currentUser
