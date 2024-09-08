import { Request, Response } from "express";
import { QueryModel } from "./query.model";

export const FlightQuerySave=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:'Flight',
            PassengerNumber:req.body.PassengerNumber,
            DomesticOrInternational:req.body.DomesticOrInternational,
            OneWayOrRoundTrip:req.body.OneWayOrRoundTrip,
            FromLocation:req.body.FromLocation,
            ToLocation:req.body.ToLocation,
            DepartureDate:req.body.DepartureDate,
            returnDate:req.body.returnDate,
            flightType:req.body.flightType,
            airlineName:req.body.airlineName,
            flightNumber:req.body.flightNumber,
            fareType:req.body.fareType,
            departureFrom:req.body.departureFrom,
            departureTime:req.body.departureTime,
            arrivalTo:req.body.arrivalTo,
            arrivalTime:req.body.arrivalTime,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            refundable:req.body.refundable,
            bookingDate:formattedDate,
            duplicate:req.body.duplicate,
            via:req.body.via,
            status:0,
            returnFliight:req.body.returnFliight ?? {},
        });
        console.log(query)
        await query.save().then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const cabQuerySave=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:'Cab',
            cabBookingType:req.body.cabBookingType,
            tripStartDateTime:req.body.tripStartDateTime,
            tripEndDateTime:req.body.tripEndDateTime,
            cabType:req.body.cabType,
            totalPassenger:req.body.totalPassenger,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            city:req.body.city,
            bookingDate:formattedDate,
            cabExtraPerHours:req.body.cabExtraPerHours,
            cabExtraKMS:req.body.cabExtraKMS,
            cabParkingetc:req.body.cabParkingetc,
            cabPerKmsrate:req.body.cabPerKmsrate,
            cabTollPermit:req.body.cabTollPermit,
            duplicate:req.body.duplicate,
            status:0,
        });
        console.log(query)
        await query.save().then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQuery=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:'Hotel',
            city:req.body.city,
               DomesticOrInternational:req.body.DomesticOrInternational,
               hotelName:req.body.hotelName,
               checkInDate:req.body.checkInDate,
               checkOutDate:req.body.checkOutDate,
               noOfNights:req.body.noOfNights,
               mealPlan:req.body.mealPlan,
               hotelCategory:req.body.hotelCategory,
               roomOcuppency:req.body.roomOcuppency,
               noOfRooms:req.body.noOfRooms,
                noOfGuests:req.body.noOfGuests,
                noOfAdults:req.body.noOfAdults,
                noOfChildren6:req.body.noOfChildren6,
                noOfChildren12:req.body.noOfChildren12,
                status:0,




        });
        console.log(query)
        await query.save().then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQueryDup=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const {id}=req.query;
        const formattedDate = currentDate.toISOString().split('T')[0];
       
        await QueryModel.findByIdAndUpdate(id,{
            status:0,
            duplicate:req.body.duplicate,
            timestamp:formattedDate,
            hotelName:req.body.hotelName,
            address:req.body.address,
            contact:req.body.contact,
            email:req.body.email,
            ourCost:req.body.ourCost,
            prf:req.body.prf,


        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const FlightQueryConfirmed=async(req:any,res:Response)=>{
    try {
        const queryId=req.params.id;
        
        const imageUrl = req.file.path;  // URL of the uploaded image
        
        await QueryModel.findOneAndUpdate({_id:queryId},{
            passengerName:req.body.passengerName,
            gender:req.body.gender,
            pnrNumber:req.body.pnrNumber,
            seatNumber:req.body.seatNumber,
            class:req.body.class,
            meal:req.body.meal,
            invoiceNumber:req.body.invoiceNumber,
            hotelImage:imageUrl,
            vendorName:req.body.vendorName,
            confirmed:req.body.confirmedQuery,
            status:1,

        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const CabQueryConfirmed=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        
        await QueryModel.findOneAndUpdate({_id:queryId},{
            cabGuestName:req.body.cabGuestName,
            cabMOBNO:req.body.cabMOBNO,
            cabPickTime:req.body.cabPickTime,
            cabPickUpAddress:req.body.cabPickUpAddress,
            cabDriverdetails:req.body.cabDriverdetails,
            cabName:req.body.cabName,
            invoiceNumber:req.body.invoiceNumber,
            vendorName:req.body.vendorName,
            cabTotalExtraHour:req.body.cabTotalExtraHour,
            cabTotalextraKms:req.body.cabTotalextraKms,
            cabTotalkms:req.body.cabTotalkms,
            cabGrosstotal:req.body.cabGrosstotal,
            confirmed:req.body.confirmedQuery,
            status:1,

        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQueryConfirmed=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        
        
        await QueryModel.findOneAndUpdate({_id:queryId,serviceType:'Hotel'},{
            ...req.body,
            contact:req.body.contact,
            email:req.body.email,
            guestName:req.body.guestName,
            bookconfirmNo:req.body.bookconfirmNo,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            address:req.body.address,
            confirmed:req.body.confirmedQuery,

            status:1,


        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getFlightQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Flight"}).sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const getCabQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Cab"}).sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getHotelQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Hotel"}).sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getAllQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find().sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const findQueryByID=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        const query=await QueryModel.findOne({_id:queryId});
        return res.status(200).json({message:"Query fetched successfully",result:query});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

