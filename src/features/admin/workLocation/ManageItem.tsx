import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'app/hooks';
import {
    AddWorkLocation,
    EditWorkLocation,
    WorkLocationForm,
    WorkLocationSchema,
    WorkLocation,
} from './itemSlice';

interface Props {
    status: string | number;
    message: string;
    worklocation?: WorkLocation;
    actionType: string;
    onComplete?: () => void;
}

const ManageItem: React.FC<Props> = ({
    status,
    message,
    actionType,
    worklocation,
    onComplete,
}) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkLocationForm>({
        defaultValues: useMemo(() => worklocation, [worklocation]),
        resolver: yupResolver(WorkLocationSchema),
    });
    const dispatch = useAppDispatch();

    const handleOnComplete = () => {
        reset();
        onComplete && onComplete();
    };

    const submitForm = (formData: WorkLocationForm) => {
        formData.items = [""]
        dispatch(
            actionType === 'add'
                ? AddWorkLocation(formData, handleOnComplete)
                : EditWorkLocation(worklocation!, formData, handleOnComplete),
        );
    };

    return (
        <div className='grid bg-white box-shadow-light br-20'>
            {(errors.location || status === 'failed') && (
                <div className='alert alert-danger'>{errors.location?.message || message}</div>
            )}
            {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
            <form onSubmit={handleSubmit(submitForm)}>
                <div className='row'>
                    <div className='col-md-12 form-group'>
                        <label className='label'>
                            Location <span className='required'>*</span>{' '}
                        </label>
                        <input
                            type='text'
                            {...register('location')}
                            className='form-control'
                            placeholder='Enter location Name..'
                        />
                    </div>
                    <div className='col-md-12 form-group'>
                        <label className='label'>
                            Country  <span className='required'>*</span>{' '}
                        </label>
                        <input
                            type='text'
                            {...register('country')}
                            className='form-control'
                            placeholder='Enter Country Name..'
                        />
                    </div>
                    <div className='col-md-12'>
                        <button type='submit' name='submit' id='submit' className='btn btn-primary custom-btn'>
                            {status === 'loading' && <span className='spinner-border' role='status'></span>}
                            {status !== 'loading' && <span>Save</span>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ManageItem;
