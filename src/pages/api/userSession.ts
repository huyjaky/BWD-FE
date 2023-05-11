

import { sessionOptions } from '@/api-client/session';
import { userAcc } from '@/models/userAcc'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'


async function userRoute(req: NextApiRequest, res: NextApiResponse) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
  if (req.session.props?.user_){
    res.status(200).json({...req.session.props.user_});
  } else {
    res.status(500).json({message: 'Empty data'});
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);