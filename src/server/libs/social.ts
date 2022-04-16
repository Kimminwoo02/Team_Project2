import { google } from 'googleapis';
import Configs from '../configs';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_HOST } = Configs;

export enum SocialProvider {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
}

const SocialOauth2 = {
  isValidatedProvider(provider: SocialProvider) {
    return ['google', 'kakao', 'naver'].includes(provider);
  },

  getLoginUrl(provider: SocialProvider) {
    const callbackUri = this.getCallbackUri(provider);

    console.log(GOOGLE_CLIENT_ID);
    switch (provider) {
      case SocialProvider.GOOGLE:
        return new google.auth.OAuth2(
          GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET,
          callbackUri
        ).generateAuthUrl({
          scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
          ],
        });
      case SocialProvider.KAKAO:
        return '미구현';
      case SocialProvider.NAVER:
        return '미구현';
    }
  },

  getCallbackUri(provider: SocialProvider) {
    return `${SERVER_HOST}/api/auth/social/callback/${provider}`;
  },
};

export default SocialOauth2;

export const getGoogleAccessToken = async (code: string) => {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `${SERVER_HOST}/api/auth/social/callback/google`
  );
  const { tokens } = await oauth2Client.getToken(code);

  if (!tokens.access_token) {
    throw new Error('Failed to retrieve google access token');
  }

  return tokens.access_token;
};

export const getGooglePeopleMe = async (accessToken: string) => {
  const people = google.people('v1');
  const profile = await people.people.get({
    access_token: accessToken,
    resourceName: 'people/me',
    personFields: 'emailAddresses',
  });
  const { data } = profile;
  const peopleMe = {
    email: data.emailAddresses![0].value || null,
    uid: data.resourceName!.replace('people/', ''),
  };

  return peopleMe;
};
