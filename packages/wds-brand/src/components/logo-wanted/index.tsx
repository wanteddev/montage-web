import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useId } from 'react';

import { LOGO_SYMBOL_GRADIENT } from '../../constants/gradient';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { LogoWantedProps } from './types';

/**
 * @description Wanted brand logo rendered as the "[x] wanted" wordmark
 */
const LogoWanted = forwardRef<
  SVGSVGElement,
  DefaultComponentPropsInternal<LogoWantedProps, 'svg'>
>(({ width = 112, height = 32, ...props }, ref) => {
  const idSuffix = useId();

  return (
    <Box
      as="svg"
      viewBox="0 0 4744 1356"
      ref={ref}
      {...props}
      sx={[{ width, height }, props.sx]}
    >
      <mask
        id={`WantedLogoSymbolMask_${idSuffix}`}
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="38"
        y="278"
        width="1272"
        height="869"
      >
        <path
          d="M480 1147C515 1147 546 1119 546 1075V735H451V994C451 1002 444 1004 439 999L185 748C179 741 182 735 191 735H819V640H111C66 640 38 671 38 707C38 724 45 742 62 759L427 1124C443 1141 462 1147 480 1147ZM1064 1131C1199 1131 1310 1020 1310 885C1310 750 1199 640 1064 640H914V735H1064C1145 735 1215 801 1215 885C1215 969 1146 1036 1064 1036C982 1036 914 967 914 885V360C914 313 878 278 832 278H534C486 278 451 314 451 361V640H546V384C546 378 550 373 556 373H808C814 373 819 378 819 384V885C819 1020 929 1131 1064 1131Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask={`url(#WantedLogoSymbolMask_${idSuffix})`}>
        <rect x="117" y="630" width="330" height="116" fill="#216BFF" />
        <path
          d="M556 1075C556 1098.26 547.94 1119.37 533.3 1134.46C519.2 1148.99 500.27 1157 480 1157C456.71 1157 435.91 1148 419.82 1130.96L54.9301 766.07C37.3101 748.45 28.0001 728.03 28.0001 707C28.0001 685.97 36.0501 667 50.6601 652.82C65.8301 638.1 87.2601 630 111 630H196.19V745L441 986.92H556V1075Z"
          fill={`url(#WantedLogoGradient0Linear_${idSuffix})`}
        />
        <path
          d="M441 996.5V361C441 307.98 480.98 268 534 268H556.18L556 1006.92L441 996.5Z"
          fill={`url(#WantedLogoGradient1Linear_${idSuffix})`}
        />
        <mask
          id={`mask1_${idSuffix}`}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="441"
          y="268"
          width="110"
          height="110"
        >
          <path d="M441 378H551V268H534C480.98 268 441 307.98 441 361V378Z" />
        </mask>
        <g mask={`url(#mask1_${idSuffix})`}>
          <rect
            x="441"
            y="268"
            width="220"
            height="220"
            fill={`url(#WantedLogoGradientFallback1_${idSuffix})`}
          />
          <foreignObject
            x="441"
            y="268"
            width="220"
            height="220"
            style={LOGO_SYMBOL_GRADIENT.foreignObjectStyle1}
          />
        </g>
        <mask
          id={`mask2_${idSuffix}`}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="28"
          y="630"
          width="158"
          height="189"
        >
          <path d="M185.52 739.98L107.18 818.32L54.93 766.07C37.31 748.45 28 728.03 28 707C28 685.97 36.05 667 50.66 652.82C65.83 638.1 87.26 630 111 630H185.52V739.98Z" />
        </mask>
        <g mask={`url(#mask2_${idSuffix})`}>
          <rect
            x="28"
            y="582.5"
            width="315"
            height="315"
            fill={`url(#WantedLogoGradientFallback2_${idSuffix})`}
          />
          <foreignObject
            x="28"
            y="582.5"
            width="315"
            height="315"
            style={LOGO_SYMBOL_GRADIENT.foreignObjectStyle2}
          />
        </g>
        <mask
          id={`mask3_${idSuffix}`}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="367"
          y="999"
          width="190"
          height="158"
        >
          <path d="M445.5 1000V999.86L556 1033.48V1074.99C556 1098.25 547.94 1119.36 533.3 1134.45C519.2 1148.98 500.27 1156.99 480 1156.99C456.71 1156.99 435.91 1147.99 419.82 1130.95L367.18 1078.32L445.5 1000Z" />
        </mask>
        <g mask={`url(#mask3_${idSuffix})`}>
          <rect
            x="288.5"
            y="843"
            width="314"
            height="314"
            fill={`url(#WantedLogoGradientFallback3_${idSuffix})`}
          />
          <foreignObject
            x="288.5"
            y="843"
            width="314"
            height="314"
            style={LOGO_SYMBOL_GRADIENT.foreignObjectStyle3}
          />
        </g>
        <path
          d="M441 998.5L556 1033.5V950.34H441V998.5Z"
          fill={`url(#WantedLogoGradient5Linear_${idSuffix})`}
        />
        <path
          d="M556 1058.5L441 998.5L441 961L556 1001L556 1058.5Z"
          fill={`url(#WantedLogoGradient6Linear_${idSuffix})`}
        />
        <path
          d="M556 725H441V830.5H556V725Z"
          fill={`url(#WantedLogoGradient7Linear_${idSuffix})`}
        />
        <mask
          id={`mask4_${idSuffix}`}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="809"
          y="630"
          width="511"
          height="511"
        >
          <path d="M965.35 984.2C938.692 957.292 924.003 922.066 924 885V871H809V885C809 953.02 835.55 1017.18 883.78 1065.68C932.09 1114.25 996.03 1141 1064 1141C1131.97 1141 1196.14 1114.26 1244.7 1065.7C1293.26 1017.14 1320 952.92 1320 885C1320 817.08 1293.25 753.08 1244.68 704.78C1196.18 656.56 1132.01 630 1064 630H900V744.99H1064C1100.95 744.99 1136.07 759.43 1162.89 785.64C1190.04 812.19 1205 847.47 1205 884.99C1205 961.42 1140.43 1025.99 1064 1025.99C1027.09 1025.99 992.05 1011.15 965.35 984.2Z" />
        </mask>
        <g mask={`url(#mask4_${idSuffix})`}>
          <rect
            x="809"
            y="630"
            width="511"
            height="511"
            fill={`url(#WantedLogoGradientFallback4_${idSuffix})`}
          />
          <foreignObject
            x="809"
            y="630"
            width="511"
            height="511"
            style={LOGO_SYMBOL_GRADIENT.foreignObjectStyle4}
          />
        </g>
        <rect x="809" y="739" width="115" height="132" fill="#FF8EBD" />
        <mask
          id={`mask5_${idSuffix}`}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="28"
          y="630"
          width="1292"
          height="512"
        >
          <path d="M924 884.99C924 922.06 938.69 957.29 965.35 984.2C992.05 1011.15 1027.09 1025.99 1064 1025.99C1140.43 1025.99 1205 961.42 1205 884.99C1205 847.47 1190.04 812.19 1162.89 785.64C1136.07 759.43 1100.95 744.99 1064 744.99H556V734.99H441V744.99H196.19L204.82 753.52L28.05 704.22C28.73 684.53 36.7 666.36 50.66 652.82C65.83 638.1 87.26 630 111 630H441V640H556V630H1064C1132.01 630 1196.18 656.56 1244.68 704.78C1293.25 753.08 1320 817.08 1320 885C1320 952.92 1293.26 1017.14 1244.7 1065.7C1196.14 1114.26 1131.97 1141 1064 1141C996.03 1141 932.09 1114.25 883.78 1065.68C835.55 1017.18 809 953.02 809 885H924V884.99Z" />
        </mask>
        <g mask={`url(#mask5_${idSuffix})`}>
          <path
            d="M1064 630H176.19L186 745H1064V630Z"
            fill={`url(#WantedLogoGradient9Linear_${idSuffix})`}
          />
        </g>
        <path
          d="M1011.5 745V630H904V745H1011.5Z"
          fill={`url(#WantedLogoGradient10Linear_${idSuffix})`}
        />
        <mask
          id={`mask6_${idSuffix}`}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="550"
          y="268"
          width="374"
          height="617"
        >
          <path d="M809 885V745H819V630H809V384C809 383.52 808.48 383 808 383H550V268H832C857.02 268 880.2 277.33 897.29 294.27C914.51 311.35 924 334.69 924 360V630H914V745H924V885H809Z" />
        </mask>
        <g mask={`url(#mask6_${idSuffix})`}>
          <path
            d="M809 268V885H924V360C924 334.69 914.51 311.35 897.29 294.27C880.2 277.33 857.01 268 832 268H809Z"
            fill={`url(#WantedLogoGradient11Linear_${idSuffix})`}
          />
        </g>
        <path
          d="M815 268H550V384H815V268Z"
          fill={`url(#WantedLogoGradient12Linear_${idSuffix})`}
        />
        <mask
          id={`mask7_${idSuffix}`}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="812"
          y="268"
          width="112"
          height="111"
        >
          <path
            d="M832 268H812.5V378.5H924V360C924 334.69 914.51 311.35 897.29 294.27C880.2 277.33 857.01 268 832 268Z"
            fill={`url(#WantedLogoGradient13Linear_${idSuffix})`}
          />
        </mask>
        <g mask={`url(#mask7_${idSuffix})`}>
          <rect
            x="691"
            y="257"
            width="243"
            height="243"
            fill={`url(#WantedLogoGradientFallback5_${idSuffix})`}
          />
          <foreignObject
            x="691"
            y="257"
            width="243"
            height="243"
            style={LOGO_SYMBOL_GRADIENT.foreignObjectStyle5}
          />
        </g>
      </g>
      <Box
        as="path"
        sx={(theme) => ({ fill: theme.semantic.label.normal })}
        d="M4424 1008C4487 1008 4540 981 4569 939V998H4673V278H4569V552C4540 513 4486 488 4423 488C4278 488 4167 605 4167 748C4167 891 4279 1008 4424 1008ZM4424 908C4339 908 4269 835 4269 748C4269 661 4339 588 4424 588C4509 588 4579 661 4579 748C4579 835 4509 908 4424 908ZM3729 706C3733 642 3796 581 3874 581C3952 581 4011 642 4015 706H3729ZM3883 1008C3984 1008 4072 950 4108 870L4025 842C4001 885 3945 915 3884 915C3796 915 3733 861 3729 788H4114C4134 620 4033 488 3883 488C3733 488 3627 595 3627 748C3627 901 3732 1008 3883 1008ZM3510 1007C3541 1007 3572 1000 3592 989V898C3568 910 3547 915 3533 915C3493 915 3473 891 3473 842V580H3592V498H3473V398H3369V498H3289V580H3369V846C3369 947 3421 1007 3510 1007ZM2797 998H2901V714C2901 627 2950 578 3021 578C3092 578 3140 627 3140 714V998H3244V708C3244 567 3179 488 3053 488C2986 488 2926 515 2901 562V498H2797V998ZM2458 908C2373 908 2303 835 2303 748C2303 661 2373 588 2458 588C2543 588 2613 661 2613 748C2613 835 2543 908 2458 908ZM2458 1008C2521 1008 2574 981 2603 939V998H2707V498H2603V552C2574 513 2520 488 2457 488C2312 488 2201 605 2201 748C2201 891 2313 1008 2458 1008ZM1636 998H1735L1828 718L1921 998H2020L2196 498H2087L1972 850L1867 498H1789L1684 850L1569 498H1460L1636 998Z"
      />
      <defs>
        <linearGradient
          id={`WantedLogoGradient0Linear_${idSuffix}`}
          x1="27.7716"
          y1="630.227"
          x2="555.522"
          y2="1157.48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C75FF" />
          <stop offset="0.310893" stopColor="#0B66FF" />
          <stop offset="0.41658" stopColor="#0064FF" />
          <stop offset="0.522267" stopColor="#0067FF" />
          <stop offset="0.733645" stopColor="#0074FF" />
          <stop offset="1" stopColor="#0084FF" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient1Linear_${idSuffix}`}
          x1="498.59"
          y1="268"
          x2="498.59"
          y2="1006.92"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0130872" stopColor="#25B9FF" />
          <stop offset="0.632316" stopColor="#07BEFF" />
          <stop offset="0.745954" stopColor="#00BEFF" />
          <stop offset="1" stopColor="#0092FF" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient5Linear_${idSuffix}`}
          x1="498.5"
          y1="950.34"
          x2="498.5"
          y2="1033.49"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#009FFF" />
          <stop offset="0.578979" stopColor="#0094FF" />
          <stop offset="1" stopColor="#0092FF" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient6Linear_${idSuffix}`}
          x1="510.338"
          y1="982.668"
          x2="496.815"
          y2="1025.94"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0098FF" stopOpacity="0" />
          <stop offset="0.249864" stopColor="#0096FF" />
          <stop offset="0.499891" stopColor="#0093FF" />
          <stop offset="0.749808" stopColor="#0091FF" stopOpacity="0.65" />
          <stop offset="1" stopColor="#0090FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient7Linear_${idSuffix}`}
          x1="498.5"
          y1="735.78"
          x2="498.5"
          y2="825.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0087FF" />
          <stop offset="1" stopColor="#67B8FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient9Linear_${idSuffix}`}
          x1="176"
          y1="688"
          x2="1064"
          y2="688"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#697DFF" />
          <stop offset="0.0251928" stopColor="#757FFF" />
          <stop offset="0.238039" stopColor="#CF94FF" />
          <stop offset="0.291258" stopColor="#ED9BFF" />
          <stop offset="0.344471" stopColor="#FE9FFF" />
          <stop offset="0.46271" stopColor="#FF99E6" />
          <stop offset="0.580945" stopColor="#FF859C" />
          <stop offset="0.628242" stopColor="#FF786E" />
          <stop offset="0.722828" stopColor="#FF5A00" />
          <stop offset="0.830944" stopColor="#FF5A00" />
          <stop offset="0.999838" stopColor="#FF5A00" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient10Linear_${idSuffix}`}
          x1="914.8"
          y1="687.5"
          x2="1006.4"
          y2="687.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2900" />
          <stop offset="1" stopColor="#FF5534" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient11Linear_${idSuffix}`}
          x1="866.5"
          y1="268"
          x2="866.5"
          y2="885"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0170303" stopColor="#76B0FF" />
          <stop offset="0.2715" stopColor="#9DACFF" />
          <stop offset="0.636231" stopColor="#F3A1FF" />
          <stop offset="0.727132" stopColor="#FF9EFD" />
          <stop offset="0.818033" stopColor="#FF97E8" />
          <stop offset="0.999848" stopColor="#FF8EBD" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient12Linear_${idSuffix}`}
          x1="550"
          y1="326"
          x2="812.5"
          y2="326"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#29B8FF" />
          <stop offset="1" stopColor="#6DB1FF" />
        </linearGradient>
        <linearGradient
          id={`WantedLogoGradient13Linear_${idSuffix}`}
          x1="869.5"
          y1="257"
          x2="869.5"
          y2="874"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0170303" stopColor="#76B0FF" />
          <stop offset="0.2715" stopColor="#9DACFF" />
          <stop offset="0.636231" stopColor="#F3A1FF" />
          <stop offset="0.727132" stopColor="#FF9EFD" />
          <stop offset="0.818033" stopColor="#FF97E8" />
          <stop offset="0.999848" stopColor="#FF8EBD" />
        </linearGradient>
        <radialGradient
          id={`WantedLogoGradientFallback1_${idSuffix}`}
          fx="0%"
          fy="50%"
          cx="0%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor="#20BAFF" />
          <stop offset="100%" stopColor="#2AB8FF" />
        </radialGradient>
        <radialGradient
          id={`WantedLogoGradientFallback2_${idSuffix}`}
          fx="40%"
          fy="60%"
          cx="30%"
          cy="80%"
          r="50%"
        >
          <stop offset="0%" stopColor="#1A6AFF" />
          <stop offset="100%" stopColor="#717EFF" />
        </radialGradient>
        <radialGradient
          id={`WantedLogoGradientFallback3_${idSuffix}`}
          fx="40%"
          fy="65%"
          cx="30%"
          cy="70%"
          r="50%"
        >
          <stop offset="0%" stopColor="#0075FF" />
          <stop offset="100%" stopColor="#0096FF" />
        </radialGradient>
        <radialGradient
          id={`WantedLogoGradientFallback4_${idSuffix}`}
          fx="50%"
          fy="0%"
          cx="100%"
          cy="5%"
          r="95%"
        >
          <stop offset="0%" stopColor="#FF5A00" />
          <stop offset="100%" stopColor="#FF8EBD" />
        </radialGradient>
        <radialGradient
          id={`WantedLogoGradientFallback5_${idSuffix}`}
          fx="25%"
          fy="55%"
          cx="25%"
          cy="0%"
          r="55%"
        >
          <stop offset="0%" stopColor="#6DB1FF" />
          <stop offset="100%" stopColor="#8FADFF" />
        </radialGradient>
      </defs>
    </Box>
  );
});

LogoWanted.displayName = 'LogoWanted';

export { LogoWanted };

export type { LogoWantedProps };
