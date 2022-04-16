import { Schema, model, Document } from 'mongoose';

export interface IAddress {
  street: string;
  city: string;
  postCode: string;
}

export interface IMember {
  name?: string;
  email: string;
  phone?: string;
  address?: IAddress;
  social: string;
  socialId: string;
}

const MemberSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String },
  },
  social: { type: String },
  socialId: { type: String },
});

const Member = model<IMember>('Member', MemberSchema);

export default Member;
