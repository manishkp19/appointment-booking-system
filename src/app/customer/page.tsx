'use client';

import { useEffect, useState } from 'react';
import { BookingForm } from './BookingForm';
import { BookingConfirmation } from './BookingConfirmation';
import { format } from 'date-fns';

import { getBookedSlot } from '@/api/.'

interface BookSlotAPIresponse {
    id: string,
    startDate: string,
    isBooked: boolean,
    bookedCustomerName: string
}

interface BookingSlotProps extends BookSlotAPIresponse {
    duration: string
}

const initialBookingData = {
    date: '',
    name: '',
    slot: '',
    duration: '',
    id: ''
}

const LOCAL_STORAGE_KEY = 'bookedSlot';

export default function Home() {

    // It's a work around to store booked slots, ideal would be to implement a auth mechanism to identify user and get booked slot from BE
    const storedSlotId = localStorage.getItem(LOCAL_STORAGE_KEY);

    const [isBookingConfirmed, setIsBookingConfirmed] = useState(!!storedSlotId);
    const [booking, setBooking] = useState(initialBookingData);

    const handleBookingConfirmation = ({ id, bookedCustomerName, isBooked, startDate, duration }: BookingSlotProps, isLocallyStored = false) => {
        setIsBookingConfirmed(isBooked);
        setBooking({
            date: format(startDate, 'dd MMM, yyyy'),
            name: bookedCustomerName,
            slot: format(startDate, 'hh:mm'),
            duration: duration ?? '60 Minutes',
            id
        });
        !isLocallyStored && localStorage.setItem(LOCAL_STORAGE_KEY, id);
    }

    const handleBookingCancellation = () => {
        setIsBookingConfirmed(false);
        setBooking(initialBookingData);
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    useEffect(() => {
        if (booking.id === '' && !!storedSlotId) {
            try {
                getBookedSlot({ slotId: storedSlotId }).then((res: BookingSlotProps) => {
                    handleBookingConfirmation(res, true);
                })
            } catch (e) {
                console.error(e);
            }
        }
    }, [])

    return (
        <div className="">
            <p className='text-2xl mb-4 underline underline-offset-8'>Booking</p>
            {!isBookingConfirmed && <BookingForm onBookingComplete={handleBookingConfirmation} />}
            {isBookingConfirmed && <BookingConfirmation {...booking} onBookingCancel={handleBookingCancellation} />}
        </div>
    );
}
