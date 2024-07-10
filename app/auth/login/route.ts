import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/_utils/supabase/server";
import { validateEmail, validatePassword } from "@/app/_utils/validators";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface FormData {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    // parse formdata and validate
    const body = await req.json();
    const { email, password } = body.data;

    // validations
    if (!email || !password) {
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // guard if error
    if (error) {
      return NextResponse.json(
        { error: "Invalid Username or Password" },
        { status: 400 }
      );
    }

    // when everything is OK
    return NextResponse.json(
      { message: "Login Successful, Redirecting" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body.", message: error },
      { status: 400 }
    );
  }
}
