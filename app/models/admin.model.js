import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updated'
    }
});

adminSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this.password = passwordHash;
        next();
    });
});

adminSchema.pre("findOneAndUpdate", function (next) {
    if (!this._update.password) return next();
    bcrypt.hash(this._update.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this._update.password = passwordHash;
        next();
    });
});

adminSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        else {
            if (!isMatch) return cb(null, isMatch);
            return cb(null, this);
        }
    });
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;