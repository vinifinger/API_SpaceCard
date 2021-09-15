import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { MessageMail } from "../entities/MessageMail";
dotenv.config();

export default class NodeMailer {
  async sendMail(message: MessageMail) {
    const params = {
      host: process.env.NODEMAILER_HOST,
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
      to: message.email,
      replyTo: message.email,
      subject: message.subject,
      html: message.body
    }
    console.log("-------------------------------")
    console.log(params)

    const transporter = await nodemailer.createTransport({
      service: params.host,
      auth: { user: params.user, pass: params.pass },
    })

    return await transporter
      .sendMail({
        from: params.user,
        to: params.to,
        replyTo: params.replyTo,
        subject: params.subject,
        html: params.html,
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        return err
      })
  }
}
