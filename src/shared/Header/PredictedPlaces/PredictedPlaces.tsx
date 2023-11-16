import React, {memo, useEffect, useState} from 'react';
import {geocodeFromString} from "../../../API/geocodeFromString";
import s from './PredictedPlaces.module.scss';

interface Props {
    query: string;
    onSelect: (coords: string, name: string) => void;
}
const PredictedPlaces = memo(({query, onSelect}: Props) => {
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(query.trim().length > 2)
            setLoading(true)
        geocodeFromString(query).then(res => {
            setPlaces(res.slice(0, 5));
        }).finally(() => setLoading(false));

    }, [query]);

    function onClick (coords: string, name: string) {
        onSelect(coords, name);
    }
    return (
        <div className={s.container}>
            {loading &&
                <div className={s.loading}>Загрузка...</div>
            }
            {
                places.map(el => (
                    <div className={s.item} onClick={() => onClick(el.coords, el.name)}>
                        {el.name}
                    </div>
                ))
            }
        </div>
    );
});

export default PredictedPlaces;
