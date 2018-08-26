// /models/User.js
import mongoose from "mongoose";
import {Schema} from "mongoose";
import bcrypt from "bcrypt-nodejs";

let UserSchema = new Schema({
    // _id is automatically created
    email: { type: String, required: true, unique: true, indexed: true, trim: true, lowercase: true, maxlength:100 },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, default: false},
    created: {type: Date, default: Date.now, required: true},
    updated: {type: Date, default: Date.now, required: true}
});

UserSchema.pre("save", function(next) {

    var user = this;

    // if the object is modified, update the updated field
    if (this.isModified()) {
        user.updated = Date.now();
    };

    // if the password is modified, rehash it before saving
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }

                user.password = hash;
                next();
            })
        })
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    
    return bcrypt.compareSync(passw, this.password);
    // bcrypt.compare(passw, this.password, function (err, isMatch) {
    //     if (err) {
    //         return cb(err);
    //     }
    //     cb(null, isMatch);
    // });
};

export default mongoose.model("User", UserSchema);