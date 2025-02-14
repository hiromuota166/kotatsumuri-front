export type plant = {
    id: string;
    name: string;
    description: string;
    care_periods: [carePeriod];
    growth_conditions: growthConditions;
    propagation_methods: propagationMethods;
    is_registered?: boolean;
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

interface propagationMethods {
    description: string;
}

export type RegisteredPlant =  {
    id: string;
    name: string;
    description: string;
}