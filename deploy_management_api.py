#!/usr/bin/env python3
"""
Deploy using Supabase Management API
Uses the access token to execute SQL directly
"""

import urllib.request
import urllib.error
import json

# These would be provided by user or from environment
ACCESS_TOKEN = None  # Will try to get from GitHub secrets or user
PROJECTS = {
    "cosmic-puppies": {
        "ref": "mocalplhdzvuiobltcqu",
        "password": "TUap46cLNK3T!_-"
    },
    "tribes-community": {
        "ref": "shriiexysllxlvjncwol", 
        "password": "n7*_Q&a66L*3kwF"
    }
}

def get_connection_string(project_ref, password):
    """Get PostgreSQL connection string"""
    return f"postgresql://postgres:{password}@db.{project_ref}.supabase.co:5432/postgres"

def main():
    print("SUPABASE MANAGEMENT API DEPLOYMENT")
    print("="*60)
    print()
    print("This script requires the SUPABASE_ACCESS_TOKEN.")
    print()
    print("To deploy manually, run these commands on a machine with internet:")
    print()
    print("# Install Supabase CLI")
    print("npm install -g supabase")
    print()
    print("# Deploy Cosmic Puppies")
    print(f"supabase login")
    print(f"supabase link --project-ref {PROJECTS['cosmic-puppies']['ref']}")
    print(f"supabase db push")
    print()
    print("# Deploy Tribes Community")
    print(f"supabase link --project-ref {PROJECTS['tribes-community']['ref']}")
    print(f"supabase db push")
    print()
    print("Or use the SQL Editor in Supabase Dashboard:")
    print(f"  Cosmic: https://supabase.com/dashboard/project/{PROJECTS['cosmic-puppies']['ref']}/sql/new")
    print(f"  Tribes: https://supabase.com/dashboard/project/{PROJECTS['tribes-community']['ref']}/sql/new")

if __name__ == '__main__':
    main()
