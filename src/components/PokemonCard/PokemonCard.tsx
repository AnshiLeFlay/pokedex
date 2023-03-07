import React, { useEffect } from "react";

import { useDispatch, useSelector } from "../../services/hooks";
import { getPokemon } from "../../services/actions";
import { Card } from "antd";

import styles from "./pokemoncard.module.css";

interface ICard {
    id: number;
}

const PokemonCard: React.FC<ICard> = (props) => {
    const pokemon = useSelector((store) =>
        store.data.find((elem) => elem.id.toString() === props.id.toString())
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (pokemon === undefined) dispatch(getPokemon(props.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, props.id]);

    return (
        <Card
            title={`${pokemon?.name
                .charAt(0)
                .toUpperCase()}${pokemon?.name.slice(1)}`}
        >
            <div>
                <img
                    className={`${styles.pokemon_card_image}`}
                    alt={pokemon?.name}
                    src={pokemon?.avatar}
                />
            </div>
            <div>{pokemon?.types.map((elem: any) => `${elem.type.name} `)}</div>
            <div>
                {pokemon?.stats.map((elem: any, index: number) => (
                    <p key={`${props.id}_${index}`}>
                        {elem.stat.name}: {elem.base_stat}
                    </p>
                ))}
            </div>
        </Card>
    );
};

export default PokemonCard;
