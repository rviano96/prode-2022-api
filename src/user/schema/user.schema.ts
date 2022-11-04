import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', async function (next: (err?: Error) => void) {
//     try {
//         if (!this.isModified('password')) {
//             return next();
//         }
//         const hashed = await bcrypt.hash(this['password'], 10);
//         this['password'] = hashed;
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

// export default UserSchema