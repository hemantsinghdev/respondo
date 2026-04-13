import { NextResponse } from "next/server";
import citiesDataRaw from "@app/data/city.json";
import countriesDataRaw from "@app/data/country.json";

// cityrow = [name, countryCode, stateCode, latitude, longitude]
type CityRow = [string, string, string, string, string];
interface Country {
  name: string;
  isoCode: string;
  [key: string]: any;
}

const citiesData = (citiesDataRaw as CityRow[]) || [];

const countryLookup: Record<string, string> = {};
(countriesDataRaw as Country[]).forEach((c) => {
  countryLookup[c.isoCode] = c.name;
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) return NextResponse.json([]);

  const limit = query.length >= 3 ? 500 : 200;
  const results: { name: string; countryCode: string; countryName: string }[] =
    [];
  const seen = new Set<string>();

  for (const city of citiesData) {
    if (results.length >= limit) break;

    const [name, countryCode] = city;

    if (name.toLowerCase().startsWith(query)) {
      const uniqueKey = `${name}-${countryCode}`.toLowerCase();

      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);

        results.push({
          name,
          countryCode,
          countryName: countryLookup[countryCode] || countryCode,
        });
      }
    }
  }

  return NextResponse.json(results);
}
