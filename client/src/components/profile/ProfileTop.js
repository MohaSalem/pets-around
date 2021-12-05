import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
                        profile: {
                            status,
                            location,
                            website,
                            social,
                            user: {name}
                        }
                    }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <h1 className="large">{name}</h1>

            <p>{location ? <span>{location}</span> : null}</p>
            <div className="icons my-1">
                {website ? (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"/>
                    </a>
                ) : null}
                {social
                    ? Object.entries(social)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => (
                            <a
                                key={key}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className={`fab fa-${key} fa-2x`}></i>
                            </a>
                        ))
                    : null}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;
