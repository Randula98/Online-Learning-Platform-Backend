import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    fname : {
        type: String,
        required: true
    },
    lname : {
        type: String,
        required: true
    },
    contactNo:{
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updated'
    }
});

studentSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this.password = passwordHash;
        next();
    });
});

studentSchema.pre("findOneAndUpdate", function (next) {
    if (!this._update.password) return next();
    bcrypt.hash(this._update.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this._update.password = passwordHash;
        next();
    });
});

studentSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        else {
            if (!isMatch) return cb(null, isMatch);
            return cb(null, this);
        }
    });
};

const Student = mongoose.model("Student", studentSchema);

export default Student;