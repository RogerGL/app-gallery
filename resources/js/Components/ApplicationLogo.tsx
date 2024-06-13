import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 164 64"
            xmlns="http://www.w3.org/2000/svg"
            
        >
            <image href="/storage/images/logoNegative.svg" width="164" height="65"  />
        </svg>
    );
}
