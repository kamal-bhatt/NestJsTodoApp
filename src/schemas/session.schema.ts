import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
    @Prop({ required: true })
    email:string

    @Prop()
    refresh_token_hash: string

    @Prop()
    access_token_hash: string
}

export const SessionSchema = SchemaFactory.createForClass(Session)