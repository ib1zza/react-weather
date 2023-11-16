import React, {
    createContext,
    memo,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import s from "./Home.module.scss";
import ThisDay from "./ThisDay/ThisDay";
import ThisDayInfo from "./ThisDayInfo/ThisDayInfo";
import Days from "./Days/Days";
import {useAppDispatch, useAppSelector} from "../../../hooks/store";
import {
    fetchCurrentWeather,
    fetchDailyForecast,
} from "../../../store/slices/WeatherSlice";
import {useParams} from "react-router-dom";
import ModalForecast from "./Days/ModalForecast/ModalForecast";
import {createForecastObjectFromServerForecast} from "../../../helpers";
import DailyForecast from "./DailyForecast/DailyForecast";
import Tabs from "./Tabs/Tabs";
import {DailyList} from "../../../store/types/types";
import TopInfo from "./TopInfo/TopInfo";
import BottomInfo from "./BottomInfo/BottomInfo";
import {geocodeFromString} from "../../../API/geocodeFromString";

export enum ForecastType {
    weekly = "weekly",
    detailed = "10 days detailed",
}

export interface Forecast {
    [x: string]: { list: DailyList[] };
}

export type GeocoderResponse = {
    suggestions: Suggestion[]
}

export interface Suggestion {
    value: string
    unrestricted_value: string
    data: Data
}

export interface Data {
    postal_code?: string
    country: string
    country_iso_code: string
    federal_district: string
    region_fias_id: string
    region_kladr_id: string
    region_iso_code: string
    region_with_type: string
    region_type: string
    region_type_full: string
    region: string
    area_fias_id?: string
    area_kladr_id?: string
    area_with_type?: string
    area_type?: string
    area_type_full?: string
    area?: string
    city_fias_id: string
    city_kladr_id: string
    city_with_type: string
    city_type: string
    city_type_full: string
    city: string
    city_area: string
    city_district_fias_id: any
    city_district_kladr_id: any
    city_district_with_type: any
    city_district_type: any
    city_district_type_full: any
    city_district: any
    settlement_fias_id: any
    settlement_kladr_id: any
    settlement_with_type: any
    settlement_type: any
    settlement_type_full: any
    settlement: any
    street_fias_id: string
    street_kladr_id: string
    street_with_type: string
    street_type: string
    street_type_full: string
    street: string
    stead_fias_id: any
    stead_cadnum: any
    stead_type: any
    stead_type_full: any
    stead: any
    house_fias_id?: string
    house_kladr_id?: string
    house_cadnum: any
    house_type?: string
    house_type_full?: string
    house?: string
    block_type: any
    block_type_full: any
    block: any
    entrance: any
    floor: any
    flat_fias_id: any
    flat_cadnum: any
    flat_type: any
    flat_type_full: any
    flat: any
    flat_area: any
    square_meter_price: any
    flat_price: any
    room_fias_id: any
    room_cadnum: any
    room_type: any
    room_type_full: any
    room: any
    postal_box: any
    fias_id: string
    fias_code: any
    fias_level: string
    fias_actuality_state: string
    kladr_id: string
    geoname_id: string
    capital_marker: string
    okato: string
    oktmo: string
    tax_office: string
    tax_office_legal: string
    timezone: any
    geo_lat: string
    geo_lon: string
    beltway_hit: any
    beltway_distance: any
    metro: any
    divisions: any
    qc_geo: string
    qc_complete: any
    qc_house: any
    history_values?: string[]
    unparsed_parts: any
    source: any
    qc: any
}


const Home = () => {
    const {city} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCurrentWeather(city || "Paris"));
        dispatch(fetchDailyForecast(city || "Paris"));
    }, [city]);

    return (
        <>
            <div className={s.home}>
                <TopInfo/>
                <BottomInfo/>
            </div>

            <ModalForecast/>
        </>
    );
};

export default memo(Home);
