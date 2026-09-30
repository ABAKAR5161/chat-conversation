const GenderCheckBox = ({ data, handleChange, errors }) => {
    return (
        <div>
            <div className="flex gap-4 mt-2">
                <div className="form-control">
                    <label className="label gap-2 cursor-pointer" htmlFor="male">
                        <span className="label-text">Male</span>
                        <input
                            checked={data.gender === "male"}
                            onChange={handleChange}
                            type="radio"
                            className="radio border-slate-900"
                            name="gender"
                            id="male"
                            value="male"
                        />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label gap-2 cursor-pointer" htmlFor="female">
                        <span className="label-text">Female</span>
                        <input
                            checked={data.gender === "female"}
                            onChange={handleChange}
                            type="radio"
                            className="radio border-slate-900"
                            name="gender"
                            id="female"
                            value="female"
                        />
                    </label>
                </div>
            </div>

            <div>
                {errors?.gender && <p className="py-1 text-sm font-semibold text-orange-900">{errors.gender}</p>}
            </div>
        </div>
    );
};

export default GenderCheckBox;