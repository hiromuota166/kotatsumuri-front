export type plant = {
    id: string;
    name: string;
    description: string;
    care_periods: [carePeriod];
    growth_conditions: growthConditions;
    is_registered: boolean;
    }

interface carePeriod {
    start_date: string;
    end_date: string;
    period_type: string;
}

interface growthConditions {
    light: string;
    soil: string;
    hardiness_zone: string;
}