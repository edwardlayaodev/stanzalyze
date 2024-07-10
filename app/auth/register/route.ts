import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "@/app/_utils/validators";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    // parse formdata and validate
    const body = await req.json();
    const { email, password, confirmPassword } = body.data;

    // validations
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      return NextResponse.json(
        { error: "Passwords must match." },
        { status: 400 }
      );
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    // guard if error
    if (error) {
      return NextResponse.json(
        { error: "Something went wrong with the registration" },
        { status: 400 }
      );
    }

    // when everything is OK
    return NextResponse.json(
      { message: "Registration Successful, Redirecting" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body.", message: error },
      { status: 400 }
    );
  }
}
