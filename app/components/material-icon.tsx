import React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    iconName: string;
    iconStyle?: "rounded" | "sharp" | "outlined"
    fontSize?: number
    fill?: 0 | 1
    weight?: 400 | 600
    grade?: -25 | 0 | 200
    opticalSize?: 20 | 24 | 48
}

export const MaterialIcon: React.FC<IconProps> = ({
                                 iconName,
                                 iconStyle = "rounded",
                                 fill = 1,
                                 weight = 600,
                                 grade = 0,
                                 opticalSize = 20,
                                 fontSize = 24
                             }: IconProps) => {
    return (
        <span
            className={`material-symbols-${iconStyle} mx-auto`}
            style={{
                fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
                fontSize: `${fontSize}px`,

            }}>
        {iconName}
      </span>
    );
}
