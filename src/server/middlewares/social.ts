import { Request, Response, NextFunction } from 'express';
import JsonWebToken from '../libs/jwt';
import { getGoogleAccessToken, getGooglePeopleMe } from '../libs/social';
import MemberService from '../services/member';

export const callbackGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query as { code?: string };

  if (!code) {
    res.send('/error?code=400');
    return;
  }

  try {
    const accessToken = await getGoogleAccessToken(code);
    const peopleMe = await getGooglePeopleMe(accessToken);
    const member = await MemberService.findMemberBySocialId(
      peopleMe.uid,
      'google'
    );

    res.locals.accessToken = accessToken;
    res.locals.peopleMe = peopleMe;
    res.locals.member = member;
    res.locals.provider = 'google';
    return next();
  } catch (err) {
    console.error(err);
    res.send('/error?code=500');
  }
};

export const callbackSocial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, peopleMe, member, provider } = res.locals;

    // 이미 가입된 유저
    if (member) {
      const oauth2Token = JsonWebToken.generateOauth2Token(member.id);
      res.cookie('access_token', oauth2Token.accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      res.cookie('refresh_token', oauth2Token.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.redirect('http://localhost:3000');
      return;
    }

    const registerToken = JsonWebToken.encodeToken(
      {
        accessToken,
        peopleMe,
        provider,
      },
      {
        expiresIn: '1h',
      }
    );

    res.cookie('register_token', registerToken, {
      maxAge: 1000 * 60 * 60,
    });

    res.redirect('http://localhost:3000/register');
  } catch (err) {
    console.error(err);
    res.redirect('/error?code=500');
  }
};
