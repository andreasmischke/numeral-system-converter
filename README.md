# numeral-system-converter

Small framework-less JS app that takes any input, tries to recognize it as·
binary, octal, decimal, or hexadecimal number and output it in all of those
formats. Conversion happens `onkeyup` so there is no (server) load time.

## Known issues

-   The app currently only works with positive numbers.
-   Conversion is done by default JS implementation. So it may not always be
    exactly the wanted results (e.g. no two's complement)
-   The character length of the output values easily exceeds the colored
    value fields and is then cut off.

## Demo

See public version as https://mischke.me/numbers/
