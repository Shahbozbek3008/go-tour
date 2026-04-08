import FaceBookAuth from "./facebook-auth"
import GoogleAuth from "./google-auth"
import LinkedinAuth from "./linkedin-auth"

export default function Oauth() {
    return (
        <div className="grid grid-cols-3 gap-6">
            <GoogleAuth />
            <FaceBookAuth />
            <LinkedinAuth />
        </div>
    )
}
