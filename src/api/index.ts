export interface BookSlotAPIresponse {
    id: string,
    startDate: string,
    isBooked: boolean,
    bookedCustomerName: string
}

export const getSlots = async ({ date }: { date: string }) => {
    const encodedDate = encodeURIComponent(date);
    const res = await fetch(`/api/getSlots?date=${encodedDate}&isBooked=false`)
    const data = await res.json();
    return data.data;
}

export const bookSlot = async ({ slotId, name }: { slotId: string, name: string }) => {
    const res = await fetch(`/api/bookSlots/${slotId}`, {
        method: 'POST',
        body: JSON.stringify({
            name
        })
    })
    const data = await res.json();
    return data.data;
}

export const cancelSlot = async ({ slotId }: { slotId: string }) => {
    const res = await fetch(`/api/cancelSlot/${slotId}`, {
        method: 'POST'
    });
    const data = await res.json();
    return data.data;
}

export const getBookedSlot = async ({ slotId }: { slotId: string }): Promise<BookSlotAPIresponse> => {
    const res = await fetch(`/api/bookedSlot/${slotId}`);
    const data = await res.json();
    return data.data;
}

export const getAllBookedSlots = async () => {
    const res = await fetch(`/api/getSlots?isBooked=true`)
    const data = await res.json();
    return data.data;
}
