import { Router } from 'express';
import SocialOauth2, { SocialProvider } from '../libs/social';
import { callbackGoogle, callbackSocial } from '../middlewares/social';
import JsonWebToken from '../libs/jwt';
import MemberService from '../services/member';

const router = Router();

router.get('/social/login/:provider', (req, res) => {
  const { provider } = req.params as { provider: SocialProvider };

  if (!SocialOauth2.isValidatedProvider(provider)) {
    res.redirect('/error?code=400');
    return;
  }

  const loginUrl = SocialOauth2.getLoginUrl(provider);

  res.redirect(loginUrl);
});

router.get('/social/callback/google', callbackGoogle, callbackSocial);

router.get('/decode/peopleme', (req, res) => {
  const token: string = req.cookies['register_token'];
  if (!token) {
    res.redirect('/error?code=401');
    return;
  }

  try {
    res.json(JsonWebToken.decodeToken(token)['peopleMe']);
  } catch (err) {
    res.redirect('/error?code=500');
    return;
  }
});

router.post('/resister', (req, res) => {
  const token = req.cookies['register_token'];
  const { name, phone } = req.body;
  const { email, uid } = JsonWebToken.decodeToken(token)['peopleMe'];

  MemberService.addMember({
    name,
    phone,
    email,
    socialId: uid,
    social: 'google',
  });

  res.redirect('http://localhost:3000');
});

router.get('/check', async (req, res) => {
  const accessToken = req.cookies['access_token'];

  if (accessToken) {
    const payload = JsonWebToken.decodeToken(accessToken);
    const { email, name } = await MemberService.findMember(
      payload['uid'] as string
    );
    res.json({
      email,
      name,
    });
  } else {
    res.json(null);
  }
});

router.post('/logout', async (req, res) => {
  res.cookie('access_token', '');
  res.cookie('refresh_token', '');

  res.status(204);
  res.send(null);
  return;
});

export default router;
